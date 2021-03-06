import { ClubsRepositories } from "../../repositories/ClubsRepositories";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IApproveClub {
    user_id: string,
    clubs_id: string[]
}

class ApproveClubService {
    async execute({ user_id, clubs_id }: IApproveClub) {

        const clubsRepository = getCustomRepository(ClubsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne(user_id);

        const clubsExists = await clubsRepository.findByIds(clubs_id, {
            where: {
                approved: false
            }
        });

        if (!clubsExists.length) {
            throw new Error("This clubs don't exists, or already approved");
        }

        await clubsRepository.update(clubsExists.map(club => club.id), {
            approved: true,
            approved_by: user
        });

        const clubs = await clubsRepository.findByIds(clubsExists.map(club => club.id));

        return { clubs };
    }
}

export { ApproveClubService };